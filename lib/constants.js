//Use node-constants module to define all of the data values sent to PicoBorg Reverse

var constants = require("node-constants");
defineCommands = constants.definer();
defineValues = constants.definer();
defineLimits = constants.definer();

// Commands
// GET commands sent should be followed by a read for the result
// All other commands are send only (no reply)
var command = defineCommands({
    SET_LED: 1, // Set the LED status
    GET_LED: 2, // Get the LED status
    SET_A_FWD: 3, // Set motor 2 PWM rate in a forwards direction
    SET_A_REV: 4, // Set motor 2 PWM rate in a reverse direction
    GET_A: 5, // Get motor 2 direction and PWM rate
    SET_B_FWD: 6, // Set motor 1 PWM rate in a forwards direction
    SET_B_REV: 7, // Set motor 1 PWM rate in a reverse direction
    GET_B: 8, // Get motor 1 direction and PWM rate
    ALL_OFF: 9, // Switch everything off
    RESET_EPO: 10, // Resets the EPO flag, use after EPO has been tripped and switch is now clear
    GET_EPO: 11, // Get the EPO latched flag
    SET_EPO_IGNORE: 12, // Set the EPO ignored flag, allows the system to run without an EPO
    GET_EPO_IGNORE: 13, // Get the EPO ignored flag
    GET_DRIVE_FAULT: 14, // Get the drive fault flag, indicates faults such as short-circuits and under voltage
    SET_ALL_FWD: 15, // Set all motors PWM rate in a forwards direction
    SET_ALL_REV: 16, // Set all motors PWM rate in a reverse direction
    SET_FAILSAFE: 17, // Set the failsafe flag, turns the motors off if communication is interrupted
    GET_FAILSAFE: 18, // Get the failsafe flag
    SET_ENC_MODE: 19, // Set the board into encoder or speed mode
    GET_ENC_MODE: 20, // Get the boards current mode, encoder or speed
    MOVE_A_FWD: 21, // Move motor 2 forward by n encoder ticks
    MOVE_A_REV: 22, // Move motor 2 reverse by n encoder ticks
    MOVE_B_FWD: 23, // Move motor 1 forward by n encoder ticks
    MOVE_B_REV: 24, // Move motor 1 reverse by n encoder ticks
    MOVE_ALL_FWD: 25, // Move all motors forward by n encoder ticks
    MOVE_ALL_REV: 26, // Move all motors reverse by n encoder ticks
    GET_ENC_MOVING: 27, // Get the status of encoders moving
    SET_ENC_SPEED: 28, // Set the maximum PWM rate in encoder mode
    GET_ENC_SPEED: 29, // Get the maximum PWM rate in encoder mode
    GET_ID: 0x99, // Get the board identifier
    SET_I2C_ADD: 0xAA, // Set a new I2C address
});

// Values
// These are the corresponding numbers for states used by the above commands
var value = defineValues({
    FWD: 1, // I2C value representing forward
    REV: 2, // I2C value representing reverse
    ON: 1, // I2C value representing on
    OFF: 0, // I2C value representing off
    I2C_ID_PICOBORG_REV: 0x15, // I2C values returned when calling the GET_ID command
    DEFAULT_I2C_ADDRESS: 0x44, // I2C address set by default (before using SET_I2C_ADD)
    I2C_BUS_ID: "/dev/i2c-1", // I2C bus, Rev 1 = /dev/i2c-0, Rev 2 = /dev/i2c-1 
    ERROR_READING: 888, // Returned from GetMotor commands when value failed to read
});

// Limits
// These define the maximums that the PicoBorg Reverse will accept
var limit = defineLimits({
    I2C_MAX_LEN: 4, // Maximum number of bytes in an I2C message
    PWM_MAX: 255, // Maximum I2C value for speed settings (represents 100% drive)
    PWM_REV_MAX: 140, // Maximum I2C value for reverse speed settings
    MINIMUM_I2C_ADDRESS: 0x03, // Minimum allowed value for the I2C address
    MAXIMUM_I2C_ADDRESS: 0x77, // Maximum allowed value for the I2C address
});

// Export our constants objects so they can be used elsewhere
module.exports.command = command;
module.exports.value = value;
module.exports.limit = limit;
