import { sha256 } from "js-sha256";
import { Buffer } from "buffer";

export {};

export const checkCompromisedPassword = (password: string, setLeaked: any) => {
  fetch(`https://api.enzoic.com/passwords`, {
    method: "POST",
    body: JSON.stringify({
      partialSHA256: String(sha256.create().update(password)).substring(0, 10),
    }),
    headers: {
      authorization:
        "basic " +
        Buffer.from(
          "c9be553a50e743afa8a851b82c36be4e" +
            ":" +
            "drr3cN!B*xr^j@STvAgW*yt9trh8dYmD"
        ).toString("base64"),
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then((response) => {
    if(response.ok){
      setLeaked(true);
      throw new Error("Leaked password")
    }else{
      setLeaked(false);
    };
   })
  .catch((error) => console.log("Error", error));
};
