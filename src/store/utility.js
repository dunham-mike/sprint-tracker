export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const convertObjectIntoArrayOfItsValues = (incomingObject) => {
    const convertedArray = Object.keys(incomingObject).map(key => {
        return incomingObject[key];
    });

    // console.log('convertedArray:', convertedArray)

    return convertedArray;
}