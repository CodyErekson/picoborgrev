/* Control functions for PicoBorg Reverse
 * https://www.piborg.org/picoborgrev
 *
 * by Cody Erekson
 * 
 * based upon the Arduino library by PiBorg
 */

var i2c = require('i2c');

//Get the constant values
var constants = require('./constants.js');
var commands = constants.commands;
var values = constants.values;
var limits = constants.limits;


var pbrAddress = values.PBR_DEFAULT_I2C_ADDRESS; // The I2C address we are currently talking to

// create wire object //TODO - scan to verify the device/bus
var wire = new i2c(address, {device: '/dev/i2c-1'});

function picoborgrev(){
    return {

        /***** Motor functions *****/

        // Sets the drive level for motor 2
        // require int
        PbrSetMotor2: function(power){

        },

        // Gets the drive level for motor 2
        PbrGetMotor2: function(){
  
        },

        // Sets the drive level for motor 1
        // require int
        PbrSetMotor1: function(power){
  
        },

        // Gets the drive level for motor 1
        PbrGetMotor1: function(){
  
        },

        // Sets the drive level for all motors
        // require int
        PbrSetMotors: function(power){
  
        },

        // Sets all motors to stopped, useful when ending a program
        PbrMotorsOff: function(){
  
        },

        /***** General functions *****/

        // Reads the board identifier and checks it is a PicoBorg Reverse, false for incorrect, true for correct
        PbrCheckId: function(){

        },

        // Sets the current state of the LED, false for off, true for on
        // require bool
        PbrSetLed: function(state){

        },

        // Reads the current state of the LED, false for off, true for on
        PbrGetLed: function(){

        },

        // Resets the EPO latch state, use to allow movement again after the EPO has been tripped
        PbrResetEpo: function(){

        },

        // Reads the system EPO latch state.
        // If false the EPO has not been tripped, and movement is allowed.
        // If true the EPO has been tripped, movement is disabled if the EPO is not ignored (see PbrSetEpoIgnore)
        //     Movement can be re-enabled by calling PbrResetEpo. 
        PbrGetEpo: function(){

        },

        // Sets the system to ignore or use the EPO latch, set to false if you have an EPO switch, true if you do not
        // require bool
        PbrSetEpoIgnore: function(state){

        },

        // Reads the system EPO ignore state, False for using the EPO latch, True for ignoring the EPO latch
        PbrGetEpoIgnore: function(){

        },

        // Sets the system to enable or disable the communications failsafe
        // The failsafe will turn the motors off unless it is commanded at least once every 1/4 of a second
        // Set to True to enable this failsafe, set to False to disable this failsafe
        // The failsafe is disabled at power on
        // require bool
        PbrSetCommsFailsafe: function(state){

        },

        // Read the current system state of the communications failsafe, true for enabled, false for disabled
        // The failsafe will turn the motors off unless it is commanded at least once every 1/4 of a second
        PbrGetCommsFailsafe: function(){

        },

        // Reads the system drive fault state, False for no problems, True for a fault has been detected
        // Faults may indicate power problems, such as under-voltage (not enough power), and may be cleared by setting a lower drive power
        // If a fault is persistent, it repeatably occurs when trying to control the board, this may indicate a wiring problem such as:
        //     * The supply is not powerful enough for the motors
        //         The board has a bare minimum requirement of 6V to operate correctly
        //         A recommended minimum supply of 7.2V should be sufficient for smaller motors
        //     * The + and - connections for either motor are connected to each other
        //     * Either + or - is connected to ground (GND, also known as 0V or earth)
        //     * Either + or - is connected to the power supply (V+, directly to the battery or power pack)
        //     * One of the motors may be damaged
        // Faults will self-clear, they do not need to be reset, however some faults require both motors to be moving at less than 100% to clear
        // The easiest way to check is to put both motors at a low power setting which is high enough for them to rotate easily, such as 30%
        // Note that the fault state may be true at power up, this is normal and should clear when both motors have been driven
        // If there are no faults but you cannot make your motors move check PbrGetEpo to see if the safety switch has been tripped
        // For more details check the website at www.piborg.org/picoborgrev and double check the wiring instructions
        PbrGetDriveFault: function(){

        },

        /***** Encoder based functions *****/

        // Sets the system to enable or disable the encoder based move mode
        // In encoder move mode (enabled) the EncoderMoveMotor* commands are available to move fixed distances
        // In non-encoder move mode (disabled) the SetMotor* commands should be used to set drive levels
        // The encoder move mode requires that the encoder feedback is attached to an encoder signal, see the website at www.piborg.org/picoborgrev for wiring instructions
        // The encoder based move mode is disabled at power on
        // require bool
        SetEncoderMoveMode: function(state){

        },

        // Read the current system state of the encoder based move mode, True for enabled (encoder moves), False for disabled (power level moves)
        GetEncoderMoveMode: function(){

        },

        // Moves motor 2 until it has seen a number of encoder counts, up to 32767
        // Use negative values to move in reverse
        // e.g.
        // EncoderMoveMotor2(100)   -> motor 2 moving forward for 100 counts
        // EncoderMoveMotor2(-50)   -> motor 2 moving reverse for 50 counts
        // EncoderMoveMotor2(5)     -> motor 2 moving forward for 5 counts
        // require int
        EncoderMoveMotor2: function(counts){

        },

        // Moves motor 1 until it has seen a number of encoder counts, up to 32767
        // Use negative values to move in reverse
        // e.g.
        // EncoderMoveMotor1(100)   -> motor 1 moving forward for 100 counts
        // EncoderMoveMotor1(-50)   -> motor 1 moving reverse for 50 counts
        // EncoderMoveMotor1(5)     -> motor 1 moving forward for 5 counts
        // require int
        EncoderMoveMotor1: function(counts){

        },

        // Moves all motors until they have each seen a number of encoder counts, up to 65535
        // Use negative values to move in reverse
        // e.g.
        // EncoderMoveMotors(100)   -> all motors moving forward for 100 counts
        // EncoderMoveMotors(-50)   -> all motors moving reverse for 50 counts
        // EncoderMoveMotors(5)     -> all motors moving forward for 5 counts
        // require int
        EncoderMoveMotors: function(counts){

        },

        // Reads the current state of the encoder motion, False for all motors have finished, True for any motor is still moving
        IsEncoderMoving: function(){

        },

        // Sets the drive limit for encoder based moves, from 0 to 1.
        // e.g.
        // SetEncoderSpeed(0.01)  -> motors may move at up to 1% power
        // SetEncoderSpeed(0.1)   -> motors may move at up to 10% power
        // SetEncoderSpeed(0.5)   -> motors may move at up to 50% power
        // SetEncoderSpeed(1)     -> motors may move at up to 100% power
        // require int
        SetEncoderSpeed: function(power){

        },

        // Gets the drive limit for encoder based moves, from 0 to 1.
        // e.g.
        // 0.01  -> motors may move at up to 1% power
        // 0.1   -> motors may move at up to 10% power
        // 0.5   -> motors may move at up to 50% power
        // 1     -> motors may move at up to 100% power
        GetEncoderSpeed: function(){

        },

        /***** Advanced functions *****/

        // Scans the I2C bus for PicoBorg Reverse boards and returns a count of all the boards found
        PbrScanForCount: function(){

        },

        // Scans the I2C bus for a PicoBorg Reverse board, index is which address to return (from 0 to count - 1)
        // Returns address 0 if no board is found for that index
        // require byte
        PbrScanForAddress: function(index){

        },

        // Sets the PicoBorg Reverse at the current address to newAddress
        // Warning, this new I²C address will still be used after resetting the power on the device
        // If successful returns true and updates pbrAddress, otherwise returns false
        // require byte
        PbrSetNewAddress: function(newAddress){

        }

    };
}

exports.picoborgrev = picoborgrev;
