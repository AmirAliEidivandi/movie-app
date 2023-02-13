import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../shared/firebase";

export const SignInWithProvider = (provider: any, type: string) => {
  signInWithPopup(auth, provider).then(async (result) => {
    const user = result.user;

    // check if user info is already stored in firestore before
    let isStored = false;
    const querySnapShot = await getDocs(collection(db, "users"));
    querySnapShot.forEach((doc) => {
      if (doc.id === user.uid) {
        isStored = true;
      }
    });
    if (isStored) return;

    let token;
    if (type === "facebook") {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      token = credential?.accessToken;
    }

    setDoc(doc(db, "users", user.uid), {
      firstName: user.displayName,
      lastName: "",
      ...(type === "google" && { photoUrl: user.photoURL }),
      ...(type === "facebook" && {
        potoUrl: user.photoURL + "?access_token=" + token,
      }),
      bookmarks: [],
      recentlyWatch: [],
      ...(type === "facebook" && { token }),
    });
  });
};
