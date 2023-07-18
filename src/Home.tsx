import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div id="home-page">
      <h1>
        <span className="one">P</span>
        <span className="two">U</span>
        <span className="three">P</span>
        <span className="four">-</span>
        <span className="five">E</span>
        <span className="six">-</span>
        <span className="seven">P</span>
        <span className="eight">I</span>
        <span className="nine">C</span>
        <span className="ten">K</span>
        <span className="eleven">E</span>
        <span className="twelve">R</span>
      </h1>
      <div
        style={{
          color: "black",
          textAlign: "center",
          padding: 10,
          fontSize: 20,
        }}
      >
        <p>
          Make an app to favorite some puppies! You'll need to treat both your{" "}
          <i style={{ backgroundColor: "gray", color: "white", padding: 2 }}>
            Functional App
          </i>{" "}
          and your{" "}
          <i style={{ backgroundColor: "gray", color: "white", padding: 2 }}>
            Class App
          </i>{" "}
          as separate apps
        </p>
      </div>
      <img src="/public/assets/blue-heeler.png" width={200} alt="" />
      <div className="links-container">
        <Link to="/functional">
          <button className="btn">Functional App</button>
        </Link>
        <Link to="/class">
          <button className="btn">Class App</button>
        </Link>
      </div>
    </div>
  );
};
