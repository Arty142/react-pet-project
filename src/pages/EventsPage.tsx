import {Link} from "react-router-dom";
import {Card} from "../components/Card/Card.tsx";

function EventsPage() {
        return (
                <><Card>
                        <Card.Header>
                                Statistics
                        </Card.Header>

                        <Card.Body>
                                <h3>24</h3>
                                <p>Active tasks</p>
                        </Card.Body>

                        <Card.Footer>
                                <Link to="/dashboard">
                                        View all
                                </Link>
                        </Card.Footer>
                </Card></>
        );
}

export default EventsPage;
