import { FC, useState, useEffect } from "react";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPlayFill, BsShareFill, BsThreeDots } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useCurrentViewportView } from "../../hooks/useCurrentViewportView";
import { db } from "../../shared/firebase";
import { DetailMovie, DetailTV, FilmInfo } from "../../shared/types";
import { resizeImage } from "../../shared/utils";
import { useAppSelector } from "../../store/hooks";
import RightbarFilms from "../common/RightbarFilms";
import SearchBox from "../common/SearchBox";
import Sidebar from "../common/Sidebar";
import SidebarMini from "../common/SidebarMini";
import Skeleton from "../common/Skeleton";
import Title from "../common/Title";
import Footer from "../footer/Footer";
import FilmTabInfo from "./FilmTabInfo";

const FilmDetail: FC<FilmInfo> = ({ credits, videos, detail, ...others }) => {
    const currentUser = useAppSelector((state) => state.auth.user);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

    useEffect(() => {
        if (!currentUser) return;

        const unsubDoc = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setIsBookmarked(doc.data()?.bookmarks.some((item: any) => item.id === detail?.id));
        });
        return () => unsubDoc();
    }, [currentUser, detail?.id]);
    
    return <div>FilmDetail</div>;
};

export default FilmDetail;
