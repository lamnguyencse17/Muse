import isLength from "validator/es/lib/isLength";
import {ID_MAX_LENGTH} from "../../common/constants/input";
import {nanoidRegex} from "../../common/constants/regex";

export default (values: {hostId: string}) => {
    const errors:joinFormError = {};
    if (values.hostId === undefined){
        errors.hostId = "Please fill in Host ID";
    }
    if (!isLength(values.hostId.trim(), {min: ID_MAX_LENGTH, max: ID_MAX_LENGTH})){
        errors.hostId = "Host ID does not have a valid length";
    }
    const test = values.hostId.match(nanoidRegex);
    if (!test || test[0] !== values.hostId){
        errors.hostId = "Host ID contains one or more invalid char";
    }
    return errors;
}
