import { useStore } from "./store";

export default function Overlay() {
  const intro = useStore((state) => state.intro);
  const toggleIntro = useStore((state) => state.toggleIntro);
  const colors = useStore((state) => state.colors);
  const decals = useStore((state) => state.decals);
  const setColor = useStore((state) => state.setColor);
  const setDecal = useStore((state) => state.setDecal);
  return (
    <section
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {intro ? (
        <div>
          <h1>Hello</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            cumque nemo maiores illo facere consequatur itaque, deleniti harum
            ut laudantium commodi vero nulla exercitationem molestias debitis
            natus incidunt cupiditate sunt.
          </p>
          <div>
            <button onClick={toggleIntro}>Hello</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={toggleIntro}>Go Back</button>
          </div>
          <div>
            {colors.map((color) => (
              <button
                key={color}
                style={{
                  backgroundColor: color,
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  margin: "10px",
                }}
                onClick={() => setColor(color)}
              ></button>
            ))}
          </div>
          <div>
            {decals.map((decal) => (
              <button
                key={decal}
                style={{
                  backgroundColor: "transparent",
                }}
                onClick={() => setDecal(decal)}
              >
                <img
                  src={`/t-shirt/${decal}.png`}
                  alt={decal}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
