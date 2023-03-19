import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faContactCard } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function NavigationBar() {
    const router = useRouter();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link href="/" className="navbar-brand">
                Tayz&nbsp;
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={`nav-item ${router.pathname === '/' ? 'active' : ''}`}>
                        <Link href="/" className="nav-link">
                            <FontAwesomeIcon icon={faHome} width={20} height={20} />
                            &nbsp;
                            Home<span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${router.pathname === '/about' ? 'active' : ''}`}>
                        <Link href="/about" className="nav-link">
                            <FontAwesomeIcon icon={faContactCard} width={20} height={20} />
                            &nbsp;
                            About
                        </Link>
                    </li>
                    <li className={`nav-item ${router.pathname === '/contact' ? 'active' : ''}`}>
                        <Link href="/contact" className="nav-link">
                            <FontAwesomeIcon icon={faContactCard} width={20} height={20} />
                            &nbsp;
                            Contact
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            href="https://github.com/FujiwaraChoki/tayz"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub} width={20} height={20} />
                            &nbsp;
                            Github
                        </Link>
                    </li>
                </ul>
            </div>
        </nav >
    );
}
