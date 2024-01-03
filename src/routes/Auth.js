import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "fbase";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPw(value);
    }
  };

  const googleLogin = () => {
    if (newAccount) {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          console.log("[[result]]", result);
        })
        .catch((error) => {
          console.log("error", error);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (newAccount) {
      createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("[[user]]", user);
        })
        .catch((error) => {
          const { code, message } = error;
          console.log(
            "[error] ",
            error,
            "\ncode: ",
            code,
            "\nmessage: ",
            message
          );
        });
    } else {
      signInWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("로그인 완료: ", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* <p>{isIn?'로그인':'회워가입'}</p> */}
        <input
          type="text"
          value={email}
          name="email"
          placeholder="Email"
          required
          onChange={onChange}
        />
        <input
          type="password"
          value={pw}
          name="password"
          placeholder="Password"
          required
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Login"} />
      </form>
      <div>
        <button type="button" onClick={googleLogin}>
          Google
        </button>
        <button type="button">Naver</button>
      </div>
    </div>
  );
};
export default Auth;
