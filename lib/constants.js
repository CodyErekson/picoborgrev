//Use node-constants module to define all of the data values sent to PicoBorg Reverse

var constants = require("node-constants");
defineCommands = constants.definer();
defineValues = constants.definer();
defineLimits = constants.definer();

// Commands
// GET commands sent should be followed by a read for the result
// All other commands are send only (no reply)
var commands = defineCommands({
    PBR_COMMAND_SET_LED: 1, // Set the LED status
    PBR_COMMAND_GET_LED: 2, // Get the LED status
    PBR_COMMAND_SET_A_FWD: 3, // Set motor 2 PWM rate in a forwards direction
    PBR_COMMAND_SET_A_REV: 4, // Set motor 2 PWM rate in a reverse direction
    PBR_COMMAND_GET_A: 5, // Get motor 2 direction and PWM rate
    PBR_COMMAND_SET_B_FWD: 6, // Set motor 1 PWM rate in a forwards direction
    PBR_COMMAND_SET_B_REV: 7, // Set motor 1 PWM rate in a reverse direction
    PBR_COMMAND_GET_B: 8, // Get motor 1 direction and PWM rate
    PBR_COMMAND_ALL_OFF: 9, // Switch everything off
    PBR_COMMAND_RESET_EPO: 10, // Resets the EPO flag, use after EPO has been tripped and switch is now clear
    PBR_COMMAND_GET_EPO: 11, // Get the EPO latched flag
    PBR_COMMAND_SET_EPO_IGNORE: 12, // Set the EPO ignored flag, allows the system to run without an EPO
    PBR_COMMAND_GET_EPO_IGNORE: 13, // Get the EPO ignored flag
    PBR_COMMAND_GET_DRIVE_FAULT: 14, // Get the drive fault flag, indicates faults such as short-circuits and under voltage
    PBR_COMMAND_SET_ALL_FWD: 15, // Set all motors PWM rate in a forwards direction
    PBR_COMMAND_SET_ALL_REV: 16, // Set all motors PWM rate in a reverse direction
    PBR_COMMAND_SET_FAILSAFE: 17, // Set the failsafe flag, turns the motors off if communication is interrupted
    PBR_COMMAND_GET_FAILSAFE: 18, // Get the failsafe flag
    PBR_COMMAND_SET_ENC_MODE: 19, // Set the board into encoder or speed mode
    PBR_COMMAND_GET_ENC_MODE: 20, // Get the boards current mode, encoder or speed
    PBR_COMMAND_MOVE_A_FWD: 21, // Move motor 2 forward by n encoder ticks
    PBR_COMMAND_MOVE_A_REV: 22, // Move motor 2 reverse by n encoder ticks
    PBR_COMMAND_MOVE_B_FWD: 23, // Move motor 1 forward by n encoder ticks
    PBR_COMMAND_MOVE_B_REV: 24, // Move motor 1 reverse by n encoder ticks
    PBR_COMMAND_MOVE_ALL_FWD: 25, // Move all motors forward by n encoder ticks
    PBR_COMMAND_MOVE_ALL_REV: 26, // Move all motors reverse by n encoder ticks
    PBR_COMMAND_GET_ENC_MOVING: 27, // Get the status of encoders moving
    PBR_COMMAND_SET_ENC_SPEED: 28, // Set the maximum PWM rate in encoder mode
    PBR_COMMAND_GET_ENC_SPEED: 29, // Get the maximum PWM rate in encoder mode
    PBR_COMMAND_GET_ID: 0x99, // Get the board identifier
    PBR_COMMAND_SET_I2C_ADD: 0xAA, // Set a new I2C address
});

// Values
// These are the corresponding numbers for states used by the above commands
var values = defineValues({
    PBR_COMMAND_VALUE_FWD: 1, // I2C value representing forward
    PBR_COMMAND_VALUE_REV: 2, // I2C value representing reverse
    PBR_COMMAND_VALUE_ON: 1, // I2C value representing on
    PBR_COMMAND_VALUE_OFF: 0, // I2C value representing off
    PBR_I2C_ID_PICOBORG_REV: 0x15, // I2C values returned when calling the GET_ID command
    PBR_DEFAULT_I2C_ADDRESS: 0x44, // I2C address set by default (before using SET_I2C_ADD)
    PBR_ERROR_READING: 888, // Returned from GetMotor commands when value failed to read
});

// Limits
// These define the maximums that the PicoBorg Reverse will accept
var limits = defineLimits({
    PBR_I2C_MAX_LEN: 4, // Maximum number of bytes in an I2C message
    PBR_PWM_MAX: 255, // Maximum I2C value for speed settings (represents 100% drive)
    PBR_MINIMUM_I2C_ADDRESS: 0x03, // Minimum allowed value for the I2C address
    PBR_MAXIMUM_I2C_ADDRESS: 0x77, // Maximum allowed value for the I2C address
});

// Export our constants objects so they can be used elsewhere
module.exports.commands = commands;
module.exports.values = values;
module.exports.limits = limits;
