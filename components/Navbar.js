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
            <Link href="/">
                <a className="navbar-brand">Tayz&nbsp;</a>
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
                        <Link href="/">
                            <a className="nav-link">
                                <FontAwesomeIcon icon={faHome} width={20} height={20} />
                                &nbsp;
                                Home<span className="sr-only">(current)</span>
                            </a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router.pathname === '/about' ? 'active' : ''}`}>
                        <Link href="/about">
                            <a className="nav-link">
                                <FontAwesomeIcon icon={faContactCard} width={20} height={20} />
                                &nbsp;
                                About
                            </a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router.pathname === '/contact' ? 'active' : ''}`}>
                        <Link href="/contact">
                            <a className="nav-link">
                                <FontAwesomeIcon icon={faContactCard} width={20} height={20} />
                                &nbsp;
                                Contact
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="https://github.com/FujiwaraChoki/tayz"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub} width={20} height={20} />
                            &nbsp;
                            Github
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
