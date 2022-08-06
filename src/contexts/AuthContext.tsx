/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React from "react";
import { Navigate } from "react-router-dom";

import { app, db } from "../services/FirebaseConfig";

interface IUSERCOLLECTIONPROPS {
  id: { id: string }[];
}

interface ISETTRANSANCTIONFIRESTORE {
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Date;
}

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
  userCollection: {
    [x: string]: any;
    id: string;
  }[];

  signOut: () => void;
  signInGoogle: () => Promise<void>;
  setEmail: (email: string) => void;
  signUpEmail: (event: ISIGNUPPROPS) => Promise<void>;
  setPassword: (password: IPASSWORDLPROPS["password"]) => void;
  setLoading: (loading: boolean) => void;
  signInEmail: (event: ISIGNUPPROPS) => Promise<void>;
  setCloudFirestore: (transactions: ISETTRANSANCTIONFIRESTORE) => Promise<void>;
  getCloudFirestore: () => Promise<void>;
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
  // Data context User Collection
  const [userCollection, setUserCollection] = React.useState<
    IUSERCOLLECTIONPROPS["id"]
  >([]);

  React.useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      const storageToken = sessionStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
  }, [user]);

  async function signInGoogle() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null && credential !== undefined) {
          const { user } = result;
          const token = user.uid;
          if (user !== null && user !== undefined) setUser(user);
          console.log("Usuario Google uid:", user.uid);

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

  // --------------------------- Cloud Firestore ------------------------------

  async function setCloudFirestore(transactions: ISETTRANSANCTIONFIRESTORE) {
    const uid = sessionStorage.getItem("@AuthFirebase:token");
    if (uid && transactions !== null && transactions !== undefined) {
      const setItemCloudFirestore = async () => {
        try {
          const docRef = await addDoc(collection(db, uid), transactions);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };
      setItemCloudFirestore();
    }
  }

  async function getCloudFirestore() {
    const uid = sessionStorage.getItem("@AuthFirebase:token");
    if (uid !== null && uid !== undefined) {
      const data = await getDocs(collection(db, uid));

      setUserCollection(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
  }

  // ---------------------------Chose Cloud Firestore ------------------------------

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
        setCloudFirestore,
        getCloudFirestore,
        userCollection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
