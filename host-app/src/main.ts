import "./styles.css";
import "./app.element.ts";

console.log("Waiting ...");
setTimeout(() => {
  console.log("Loading ...");
  import("interop_app/Catalog")
    .then((init) => {
      init.default();
      console.log("Initialized!!");
    })
    .catch((err) => {
      console.error(err);
    });
}, 2000);
