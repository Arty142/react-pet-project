
import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
        children: ReactNode;
        className?: string;
}

interface CardSectionProps {
        children: ReactNode;
}

function CardRoot({ children, className = '' }: CardProps) {
        return (
                <section className={`card ${className}`}>
                        {children}
                </section>
        );
}

function CardHeader({ children }: CardSectionProps) {
        return (
                <header className="card__header">
                        {children}
                </header>
        );
}

function CardBody({ children }: CardSectionProps) {
        return (
                <div className="card__body">
                        {children}
                </div>
        );
}

function CardFooter({ children }: CardSectionProps) {
        return (
                <footer className="card__footer">
                        {children}
                </footer>
        );
}

export const Card = Object.assign(CardRoot, {
        Header: CardHeader,
        Body: CardBody,
        Footer: CardFooter,
});
