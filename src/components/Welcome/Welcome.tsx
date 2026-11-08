interface WelcomeProps {
        name: string;
        role: string;
}

export function Welcome({ name, role }: WelcomeProps) {
        return (
                <section className="welcome">
                        <h1>Hello, {name}!</h1>
                        <p>Your role: {role}</p>
                </section>
        );
}

export default Welcome;
