import React, {useEffect, useState} from 'react';
import {connectToPeerServer, disconnectToPeerServer, getPeerObject, PeerObject} from "../common/peer";
import {Formik} from "formik";
import {ID_MAX_LENGTH} from "../common/constants/input";
import joinValidator from "./validators/joinValidator";
import {useHistory} from "react-router-dom";

const joinFormInitialValue = {
    hostId: ""
}

function Join() {
    const history = useHistory();
    const [clientId, setClientId] = useState("");
    const [peerObject, setPeer] = useState<PeerObject | undefined>(undefined);
    useEffect(() => {
        let isConnected = false;
        (async () => {
            let returnedPeer;
            try {
                returnedPeer = getPeerObject();
            } catch (err) {
                returnedPeer = await connectToPeerServer()
            }
            if (returnedPeer !== undefined && returnedPeer.peer !== undefined) {
                setPeer(returnedPeer);
                setClientId(returnedPeer.getPeerID());
                returnedPeer.peer.on("connection", () => {
                    isConnected = true;
                    history.push("/session")
                })
            }
        })()
        return () => {
            if (isConnected) {
                peerObject?.peer?.off("connection", () => {
                });
            } else {
                disconnectToPeerServer();
            }
        }
    }, [])

    const submitJoinForm = ({hostId}: { hostId: string }, {
        setSubmitting,
        setErrors
    }: { setSubmitting: any, setErrors: any }) => {
        setSubmitting(true);
        if (peerObject === undefined) {
            setSubmitting(false);
            setErrors({hostId: "You are not connected to the peer server"});
            return;
        }
        const connectionStatus = peerObject.connectToHost(hostId);
        if (!connectionStatus) {
            setSubmitting(false);
            setErrors({hostId: "Something went wrong"});
            return;
        }
        setSubmitting(false);
        console.log("connected");
    }
    return (
        <div className="overflow-hidden bg-orange-400" style={{height: "90%"}}>
            <div className="container mx-auto h-full">
                <Formik initialValues={joinFormInitialValue}
                        onSubmit={(values, {setSubmitting, setErrors}) => submitJoinForm(values, {
                            setSubmitting,
                            setErrors
                        })}
                        validate={joinValidator}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          isSubmitting,
                          isValid,
                          submitForm
                      }) => <form className="flex flex-col justify-center text-center h-full">
                        <label htmlFor="hostId" className="text-5xl text-white mb-10">HOST ID</label>
                        <input id="hostId" name="hostId" type="text" disabled={isSubmitting}
                               className="shadow border border-gray-600 w-1/2 mx-auto h-10 my-10 px-5"
                               onChange={handleChange}
                               value={values.hostId}
                               maxLength={ID_MAX_LENGTH}
                               required/>
                        <div>{errors.hostId && touched.hostId && errors.hostId}</div>
                        <button disabled={isSubmitting || !isValid} onClick={submitForm}
                                className="mx-auto bg-black text-2xl text-white rounded-2xl p-2 border-white w-1/2 my-5">JOIN
                        </button>
                    </form>}
                </Formik>
            </div>
        </div>
    );
}

export default Join;
