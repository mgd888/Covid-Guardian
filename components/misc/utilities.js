/*
 *  utilities.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines functions that are used throughout the app in multiple screens. This way we aren't
 *           redefinining similar functions for each screen.
 * 
 *           As of right now there is only one function, but if the app were to be expanded, additional shared
 *           functions would be added
 * 
 *  Author: Jason Wolfe 
 */

 /*
 * getRegionString(regionID)
 *      regionID: number = the regionID you want to convert to a string
 *
 *  Function simply converts a given regionID to the corresponding string value.
 *  Needed because the regions are stored as IDs in firebase.
 */
export function getRegionString(regionID) {
    let result;
    switch (regionID) {
        case 0:
            result = "Far North West";
            break;
        case 1:
            result = "Far North Central";
            break;
        case 2:
            result = "Far North East";
            break;
        case 3:
            result = "North West";
            break;
        case 4:
            result = "North Central";
            break;
        case 5:
            result = "North East";
            break;
        case 6:
            result = "Saskatoon";
            break;
        case 7:
            result = "Central West";
            break;
        case 8:
            result = "Central East";
            break;
        case 9:
            result = "Regina";
            break;
        case 10:
            result = "South West";
            break;
        case 11:
            result = "South Central";
            break;
        case 12:
            result = "South East";
            break;
        default:
            result = "invalid region: " + regionID;
            break;
    }
    return result;
}