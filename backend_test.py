import requests
import sys
import json
from datetime import datetime

class PostgreSQLAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.created_status_ids = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2, default=str)}")
                    return True, response_data
                except:
                    print(f"   Response: {response.text}")
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except requests.exceptions.ConnectionError as e:
            print(f"❌ Failed - Connection Error: {str(e)}")
            return False, {}
        except requests.exceptions.Timeout as e:
            print(f"❌ Failed - Timeout Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test GET /api/ - Welcome message"""
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "api/",
            200
        )
        if success and 'message' in response:
            print(f"   ✓ Welcome message received: {response['message']}")
        return success

    def test_health_check(self):
        """Test GET /api/health - Health check with DB status"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        if success:
            status = response.get('status', 'unknown')
            database = response.get('database', 'unknown')
            timestamp = response.get('timestamp', 'unknown')
            
            print(f"   ✓ Status: {status}")
            print(f"   ✓ Database: {database}")
            print(f"   ✓ Timestamp: {timestamp}")
            
            # Database disconnected is expected locally
            if database == 'disconnected':
                print(f"   ℹ️  Database disconnected is normal in local development")
        return success

    def test_create_status_check(self, client_name):
        """Test POST /api/status - Create status check"""
        success, response = self.run_test(
            f"Create Status Check for '{client_name}'",
            "POST",
            "api/status",
            201,
            data={"client_name": client_name}
        )
        if success and 'id' in response:
            status_id = response['id']
            self.created_status_ids.append(status_id)
            print(f"   ✓ Created status check with ID: {status_id}")
            print(f"   ✓ Client name: {response.get('client_name')}")
            print(f"   ✓ Timestamp: {response.get('timestamp')}")
            return status_id
        return None

    def test_get_status_checks(self):
        """Test GET /api/status - Get all status checks"""
        success, response = self.run_test(
            "Get All Status Checks",
            "GET",
            "api/status",
            200
        )
        if success:
            if isinstance(response, list):
                print(f"   ✓ Retrieved {len(response)} status checks")
                for i, check in enumerate(response[:3]):  # Show first 3
                    print(f"   [{i+1}] ID: {check.get('id', 'N/A')[:8]}... Client: {check.get('client_name', 'N/A')}")
                if len(response) > 3:
                    print(f"   ... and {len(response) - 3} more")
            else:
                print(f"   ⚠️  Expected list, got: {type(response)}")
        return success

def main():
    print("🚀 Starting PostgreSQL API Tests")
    print("=" * 50)
    
    # Setup
    tester = PostgreSQLAPITester("http://localhost:8001")
    
    # Test sequence
    print("\n📋 Test Plan:")
    print("1. Root endpoint (GET /api/)")
    print("2. Health check (GET /api/health)")
    print("3. Create status checks (POST /api/status)")
    print("4. Get status checks (GET /api/status)")
    
    # Run tests
    print("\n🧪 Running Tests...")
    
    # 1. Test root endpoint
    if not tester.test_root_endpoint():
        print("❌ Root endpoint failed, stopping tests")
        return 1

    # 2. Test health check
    if not tester.test_health_check():
        print("❌ Health check failed, stopping tests")
        return 1

    # 3. Test creating status checks (even if DB is disconnected, should handle gracefully)
    test_clients = [
        f"TestClient_{datetime.now().strftime('%H%M%S')}_1",
        f"TestClient_{datetime.now().strftime('%H%M%S')}_2",
        "Railway Test Client"
    ]
    
    created_count = 0
    for client in test_clients:
        status_id = tester.test_create_status_check(client)
        if status_id:
            created_count += 1

    # 4. Test getting status checks
    if not tester.test_get_status_checks():
        print("❌ Get status checks failed")

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if created_count > 0:
        print(f"✅ Successfully created {created_count} status checks")
    
    if tester.created_status_ids:
        print(f"🆔 Created IDs: {', '.join([id[:8] + '...' for id in tester.created_status_ids])}")
    
    # Summary
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! API is working correctly.")
        if created_count == 0:
            print("ℹ️  Note: Status creation may fail due to DB disconnection (expected locally)")
        return 0
    else:
        failed_count = tester.tests_run - tester.tests_passed
        print(f"⚠️  {failed_count} test(s) failed. Check the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())