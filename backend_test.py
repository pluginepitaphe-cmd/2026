import requests
import sys
import os
import json
from datetime import datetime

class SiPortEventAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "name": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                self.log_test(name, False, f"Unsupported method: {method}")
                return False, {}

            print(f"   Status Code: {response.status_code}")
            
            # Check if response is JSON
            try:
                response_data = response.json()
                print(f"   Response: {json.dumps(response_data, indent=2)}")
            except:
                response_data = response.text
                print(f"   Response (text): {response_data}")

            success = response.status_code == expected_status
            if success:
                self.log_test(name, True)
                return True, response_data if isinstance(response_data, dict) else {}
            else:
                self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}")
                return False, {}

        except requests.exceptions.RequestException as e:
            self.log_test(name, False, f"Request error: {str(e)}")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Unexpected error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "/api/",
            200
        )
        
        if success and response.get("message") == "Hello World":
            print("   ✓ Correct message returned")
            return True
        elif success:
            self.log_test("Root API Message Validation", False, f"Expected 'Hello World', got '{response.get('message')}'")
            return False
        return False

    def test_health_endpoint(self):
        """Test GET /api/health endpoint"""
        success, response = self.run_test(
            "Health Check Endpoint",
            "GET",
            "/api/health",
            200
        )
        
        if success and response.get("status") == "healthy":
            print("   ✓ Health check passed")
            return True
        elif success:
            self.log_test("Health Check Validation", False, f"Expected status 'healthy', got '{response.get('status')}'")
            return False
        return False

    def test_create_status_check(self):
        """Test POST /api/status endpoint"""
        test_data = {"client_name": "test_client"}
        
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "/api/status",
            200,
            data=test_data
        )
        
        if success and response.get("client_name") == "test_client":
            print("   ✓ Status check created successfully")
            return response.get("id")  # Return the ID for further testing
        elif success:
            self.log_test("Status Check Creation Validation", False, f"Expected client_name 'test_client', got '{response.get('client_name')}'")
            return None
        return None

    def test_get_status_checks(self):
        """Test GET /api/status endpoint"""
        success, response = self.run_test(
            "Get Status Checks",
            "GET",
            "/api/status",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   ✓ Retrieved {len(response)} status checks")
            return True
        elif success:
            self.log_test("Status Checks Retrieval Validation", False, f"Expected list, got {type(response)}")
            return False
        return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting SiPortEvent 2026 API Tests")
        print("=" * 50)
        
        # Test 1: Root endpoint
        self.test_root_endpoint()
        
        # Test 2: Health check
        self.test_health_endpoint()
        
        # Test 3: Create status check
        status_id = self.test_create_status_check()
        
        # Test 4: Get status checks
        self.test_get_status_checks()
        
        # Print summary
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("\n🎉 All tests passed! API is working correctly.")
            return True
        else:
            print(f"\n⚠️  {self.tests_run - self.tests_passed} test(s) failed. Check the details above.")
            return False

def main():
    """Main test function"""
    print("SiPortEvent 2026 - Backend API Testing")
    print("Testing against local development server")
    
    tester = SiPortEventAPITester()
    success = tester.run_all_tests()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())