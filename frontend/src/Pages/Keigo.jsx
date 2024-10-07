import "./Keigo.css"

export const Keigo = () => {

    const situations = [
        {id: 1, title: "Phone Conversation", image: "#"},
        {id: 2, title: "Requesting a Favor", image: "#"},
        {id: 3, title: "what ever", image: "#"},
    ]

    const handleClick = () => {
        console.log("hello, clicked!")
    }

    return (
        <div className="grid-container">
            {situations.map((situation) => (
                <div
                    key={situation.id}
                    className="grid-item"
                    onClick={handleClick}
                >
                    <img src={situation.image} alt={situation.title} />
                    <div className="overlay">{situation.title}</div>
                </div>
            ))}
        </div>
    )
}
