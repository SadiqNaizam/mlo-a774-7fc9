import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    console.log('Footer loaded');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-muted/40">
            <div className="container flex flex-col items-center justify-between gap-4 py-5 md:h-16 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    &copy; {currentYear} RFPStream. All rights reserved.
                </p>
                <nav className="flex gap-4 sm:gap-6">
                    <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                        Help Center
                    </Link>
                    <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                        Terms of Service
                    </Link>
                    <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                        Privacy Policy
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;