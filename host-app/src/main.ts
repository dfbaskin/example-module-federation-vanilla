import "./styles.css";
import "./app.element.ts";

setTimeout(() => {
  import("interop_app").catch((err) => {
    console.error(err);
  });
});
