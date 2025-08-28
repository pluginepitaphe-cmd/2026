import React from 'react';
import { Outlet } from 'react-router-dom';
import SiportsNavigation from './SiportsNavigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiportsNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">SIPORTS 2026</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Salon International des Ports et de leur Écosystème
              </p>
              <p className="text-sm text-primary-foreground/80">
                Du 5 au 7 février 2026<br />
                Parc d'Exposition Mohammed VI<br />
                El Jadida, Maroc
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Liens Utiles</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="/exposants" className="hover:text-secondary transition-colors">Exposants</a></li>
                <li><a href="/calendrier" className="hover:text-secondary transition-colors">Calendrier</a></li>
                <li><a href="/contact" className="hover:text-secondary transition-colors">Contact</a></li>
                <li><a href="/inscription" className="hover:text-secondary transition-colors">Inscription</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>Email: contact@siportevent.com</p>
                <p>Tél: +212 XXX XXX XXX</p>
                <p>Sous l'égide du Ministère de l'Équipement et de l'Eau</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary/20 mt-8 pt-8 text-center">
            <p className="text-sm text-primary-foreground/60">
              © 2026 SIPORTS. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

