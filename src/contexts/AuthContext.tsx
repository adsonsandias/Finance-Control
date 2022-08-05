/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import React from "react";
import { Navigate } from "react-router-dom";

import { app } from "../services/FirebaseConfig";

interface ISIGNUPPROPS {
  preventDefault: () => void;
}

interface IEMAILPROPS {
  email: string;
  setEmail: (email: string) => void;
}

interface IPASSWORDLPROPS {
  password: string;
  setPassword: (email: string) => void;
}

interface ILOADINGPROPS {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface ISIGNINPROPS {
  preventDefault: () => void;
}

// ----------------------- Gooogle Auth----------------------------------------
interface IAUTHGOOGLEPROVIDERPROPS {
  children: React.ReactNode;
}

interface IUSERPROPS {
  user: string | null | object;
  setUser(user: string | null | object): void;
}

interface IAUTHCONTEXTDATA {
  user: IUSERPROPS["user"];
  signed: boolean;
  email: IEMAILPROPS["email"];
  password: IPASSWORDLPROPS["password"];
  loading: boolean;

  signOut: () => void;
  signInGoogle: () => Promise<void>;
  setEmail: (email: string) => void;
  signUpEmail: (event: ISIGNUPPROPS) => Promise<void>;
  setPassword: (password: IPASSWORDLPROPS["password"]) => void;
  setLoading: (loading: boolean) => void;
  signInEmail: (event: ISIGNUPPROPS) => Promise<void>;
}

export const AuthContext = React.createContext<IAUTHCONTEXTDATA>(
  {} as IAUTHCONTEXTDATA
);

export function AuthGoogleProvider({ children }: IAUTHGOOGLEPROVIDERPROPS) {
  // Email Context
  const [email, setEmail] = React.useState<IEMAILPROPS["email"]>("");
  const [password, setPassword] =
    React.useState<IPASSWORDLPROPS["password"]>("");
  const [loading, setLoading] = React.useState<ILOADINGPROPS["loading"]>(false);
  // Google context
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  // User context
  const [user, setUser] = React.useState<IUSERPROPS["user"]>(null);

  React.useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      const storageToken = sessionStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
  });

  async function signInGoogle() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null && credential !== undefined) {
          const token = credential.accessToken;
          const { user } = result;
          if (user !== null && user !== undefined) setUser(user);
          if (token !== undefined)
            sessionStorage.setItem("@AuthFirebase:token", token);
          sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
          return {
            user,
            token,
          };
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const { email } = error;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  }

  // ----------------------------- End Google Auth---------------------------------

  // ------------------------------  Email Auth  ----------------------------------

  async function signUpEmail(event: ISIGNUPPROPS) {
    setLoading(true);
    event.preventDefault();
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        setUser(user);
        const token = user.uid;
        // const token = user.accessToken;
        if (token !== undefined) {
          sessionStorage.setItem("@AuthFirebase:token", token);
          sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        }

        setLoading(false);

        // ...
        return {
          user,
          token,
        };
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        // ..
      });
  }

  async function signInEmail(event: ISIGNINPROPS) {
    setLoading(true);
    event.preventDefault();
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        setUser(user);
        const token = user.uid;
        // const token = user.accessToken;
        if (token !== undefined) {
          sessionStorage.setItem("@AuthFirebase:token", token);
          sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        }

        setLoading(false);

        // ...
        return {
          user,
          token,
        };
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        // ..
      });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signInGoogle,
        signOut,
        signUpEmail,
        setEmail,
        email,
        setPassword,
        password,
        setLoading,
        loading,
        signInEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
