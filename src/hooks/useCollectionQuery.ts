import { useEffect, useState } from "react";
import { CollectionReference, DocumentData, onSnapshot, Query, QuerySnapshot } from "firebase/firestore";

export const useCollectionQuery: (
    id: number | string | undefined,
    collection: CollectionReference | Query<DocumentData>
) => {
    isLoading: boolean;
    isError: boolean;
    data: QuerySnapshot<DocumentData> | null;
} = (id, collection) => {
    const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(null);
    const [isLoading, setIsLoading] = useState(!Boolean(data));
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection,
            (querySnapshot) => {
                setData(querySnapshot);
                setIsLoading(false);
                setIsError(false);
            },
            (err) => {
                console.log(err, 111);
                setData(null);
                setIsLoading(false);
                setIsError(true);
            }
        );
        return () => unsubscribe();
        // eslint-disable-next-line
    }, [id]);

    return { isLoading, isError, data}
};
