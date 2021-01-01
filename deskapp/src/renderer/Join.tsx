import React, {useEffect, useState} from 'react';
import {connectToPeerServer, disconnectToPeerServer, getPeerObject, PeerObject} from "../common/peer";
import {Formik} from "formik";

const joinFormInitialValue = {
    hostId: ""
}

function Join() {
    const [clientId, setClientId] = useState("");
    const [peer, setPeer] = useState<PeerObject | undefined>(undefined);
    useEffect(() => {
        (async () => {
            try {
                setPeer(getPeerObject());
            } catch (err) {
                const returnedPeer = await connectToPeerServer()
                setPeer(returnedPeer);
                setClientId(returnedPeer.getPeerID());
            }
        })()
        return () => {
            disconnectToPeerServer();
        }
    }, [])
    return (
        <div className="overflow-hidden bg-orange-400" style={{height: "90%"}}>
            <div className="container mx-auto h-full">
                <Formik initialValues={joinFormInitialValue}
                        onSubmit={(values, {setSubmitting}) => console.log(values)}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          isSubmitting,
                      }) => <form className="flex flex-col justify-center text-center h-full">
                        <label htmlFor="hostId" className="text-5xl text-white mb-10">HOST ID</label>
                        <input id="hostId" name="hostId" type="text" disabled={isSubmitting}
                               className="shadow border border-gray-600 w-1/2 mx-auto h-10 my-10"
                               onChange={handleChange}
                               value={values.hostId} required/>
                        <div>{errors.hostId && touched.hostId && errors.hostId}</div>
                        <button disabled={isSubmitting} type="submit"
                                className="mx-auto bg-black text-2xl text-white rounded-2xl p-2 border-white w-1/2 my-5">JOIN
                        </button>
                    </form>}
                </Formik>
            </div>
        </div>
    );
}

export default Join;
