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
var command = constants.command;
var value = constants.value;
var limit = constants.limit;


// create wire object //TODO - scan to verify the device/bus
var wire = new i2c(value.DEFAULT_I2C_ADDRESS, {device: value.I2C_BUS_ID});

function picoborgrev(){
    return {

        /***** Motor functions *****/

        // Sets the drive level for motor 2
        // require int
        /* Sets the drive level for motor 2, from +100% to -100%
         * e.g.
         * SetMotor2(0)     -> motor 2 is stopped
         * SetMotor2(75)    -> motor 2 moving forward at 75% power
         * SetMotor2(-50)   -> motor 2 moving revers at 50% power
         */
        SetMotor2: function(power, callback){
            var cmd = command.SET_A_FWD;
            if ( power < 0 ){
                cmd = command.SET_A_REV;
            }
            if ( power > 100 ){
                power = 100;
            } else if ( power < -100 ){
                power = -100;
            }
            power = ( ( power / 100 ) * PWM_MAX );
            wire.writeBytes(cmd, [power], function(err) {
                callback(err);
            });
        },

        // Gets the drive level for motor 2
        GetMotor2: function(callback){
            wire.readBytes(command.GET_A, limit.I2C_MAX_LEN, function(err, res) {
                if ( err ){
                    callback(err);
                } else {
                    if ( !Buffer.isBuffer(res) ){
                        callback(new Error("Failed reading motor 2 drive level!"));
                    }
                    power = ( ( parseFloat(res[2]) * 100 ) / parseFloat(limit.PWM_MAX) );
                    if ( res[1] == value.FWD ){
                        callback(null, power);
                    } else if ( res[1] == value.REV ){
                        if ( power > 0 ){
                            power = ( power * -1 );
                        }
                        callback(null, power);
                    }
                }
            }); 
        },

        // Sets the drive level for motor 1
        // require int
        SetMotor1: function(power, callback){
              var cmd = command.SET_B_FWD;
              if ( power < 0 ){
                  cmd = command.SET_B_REV;
              } 
              if ( power > 100 ){
                  power = 100;
              } else if ( power < -100 ){
                  power = -100;
              }
              power = ( ( power / 100 ) * PWM_MAX );
              wire.writeBytes(cmd, [power], function(err) {
                  callback(err);
              });
        },

        // Gets the drive level for motor 1
        GetMotor1: function(callback){
            wire.readBytes(command.GET_B, limit.I2C_MAX_LEN, function(err, res) {
                if ( err ){
                    callback(err);
                } else {
                    if ( !Buffer.isBuffer(res) ){
                        callback(new Error("Failed reading motor 1 drive level!"));
                    }   
                    power = ( ( parseFloat(res[2]) * 100 ) / parseFloat(limit.PWM_MAX) );
                    if ( res[1] == value.FWD ){
                        callback(null, power);
                    } else if ( res[1] == value.REV ){
                        if ( power > 0 ){
                            power = ( power * -1 );
                        }
                        callback(null, power);
                    }
                }
            }); 
        },

        // Sets the drive level for all motors
        // require int
        SetMotors: function(power, callback){
            if ( power < 0 ){
                wire.writeBytes(command.SET_ALL_REV, [power], function(err) {
                    callback(err);
                });
            } else {
                if ( power > limit.PWM_MAX ){
                    power = limit.PWM_MAX;
                }
                wire.writeBytes(command.SET_ALL_FWD, [power], function(err) {
                    callback(err);
                });
            } 
        },

        // Sets all motors to stopped, useful when ending a program
        MotorsOff: function(callback){
            wire.writeByte(command.ALL_OFF, function(err) {
                callback(err);
            });
        },

        /***** General functions *****/

        // Reads the board identifier and checks it is a PicoBorg Reverse, false for incorrect, true for correct
        CheckId: function(callback){
            wire.readBytes(command.GET_ID, limit.I2C_MAX_LEN, function(err, res) {
                if ( err !== null ){
                    callback(err, false);
                }
                if ( !Buffer.isBuffer(res) ){
                    callback(new Error("Scan return was not a buffer object."), false);
                }
                if ( res[1] == value.I2C_ID_PICOBORG_REV ){
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            });                    
        },

        // Sets the current state of the LED, false for off, true for on
        // require bool
        SetLed: function(state, callback){
            var s = value.OFF;
            if ( state ){
                s = value.ON;
            }
            wire.writeBytes(command.SET_LED, [s], function(err) {
                callback(err);
            });
        },

        // Reads the current state of the LED, false for off, true for on
        GetLed: function(callback){
            wire.readBytes(command.GET_LED, limit.I2C_MAX_LEN, function(err, res) {
                if ( err ){
                    callback(err);
                } else {
                    if ( !Buffer.isBuffer(res) ){
                        callback(new Error("Failed reading LED state!"));
                    }
                    if ( res[1] == value.OFF ){
                        callback(null, false);
                    } else if ( res[1] == value.ON ){
                        callback(null, true);
                    }
                }
            });
        },

        // Resets the EPO latch state, use to allow movement again after the EPO has been tripped
        ResetEpo: function(callback){
            wire.writeByte(RESET_EPO, function(err) {
                if ( err ){
                    callback(err);
                }
            });
        },

        // Reads the system EPO latch state.
        // If false the EPO has not been tripped, and movement is allowed.
        // If true the EPO has been tripped, movement is disabled if the EPO is not ignored (see SetEpoIgnore)
        //     Movement can be re-enabled by calling ResetEpo. 
        GetEpo: function(callback){
            wire.readBytes(command.GET_EPO, limit.I2C_MAX_LEN, function(err, res) {
                if ( err ){
                    callback(err);
                } else {
                    if ( !Buffer.isBuffer(res) ){
                        callback(new Error("Failed reading EPO state!"));
                    }
                    if ( res[1] == value.OFF ){
                        callback(null, false);
                    } else if ( res[1] == value.ON ){
                        callback(null, true);
                    }
                }
            });
        },

        // Sets the system to ignore or use the EPO latch, set to false if you have an EPO switch, true if you do not
        // require bool
        SetEpoIgnore: function(state, callback){
            var s = value.OFF;
            if ( state ){
                s = value.ON;
            }
            wire.writeBytes(command.SET_EPO_IGNORE, [s], function(err) {
                if ( err ){
                    callback(err);
                }
            });
        },

        // Reads the system EPO ignore state, False for using the EPO latch, True for ignoring the EPO latch
        GetEpoIgnore: function(callback){
            wire.readBytes(command.GET_EPO_IGNORE, limit.I2C_MAX_LEN, function(err, res) {
                if ( err ){
                    callback(err);
                } else { 
                    if ( !Buffer.isBuffer(res) ){
                        callback(new Error("Failed reading EPO ignore state!"));
                    } 
                    if ( res[1] == value.OFF ){
                        callback(null, false);
                    } else if ( res[1] == value.ON ){
                        callback(null, true);
                    } 
                }
            });
        },

        // Sets the system to enable or disable the communications failsafe
        // The failsafe will turn the motors off unless it is commanded at least once every 1/4 of a second
        // Set to True to enable this failsafe, set to False to disable this failsafe
        // The failsafe is disabled at power on
        // require bool
        SetCommsFailsafe: function(state, callback){
            var s = value.OFF;
            if ( state ){
                s = value.ON;
            }
            wire.writeBytes(command.SET_FAILSAFE, [s], function(err) {
                if ( err ){
                    callback(err);
                }
            });
        },

        // Read the current system state of the communications failsafe, true for enabled, false for disabled
        // The failsafe will turn the motors off unless it is commanded at least once every 1/4 of a second
        GetCommsFailsafe: function(callback){
            wire.readBytes(command.GET_FAILSAFE, limit.I2C_MAX_LEN, function(err, res) {
                if ( err ){
                    callback(err);
                } else {
                    if ( !Buffer.isBuffer(res) ){
                        callback(new Error("Failed reading command failsafe state!"));
                    } 
                    if ( res[1] == value.OFF ){
                        callback(null, false);
                    } else if ( res[1] == value.ON ){
                        callback(null, true);
                    } 
                 }
            });
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
        // If there are no faults but you cannot make your motors move check GetEpo to see if the safety switch has been tripped
        // For more details check the website at www.piborg.org/picoborgrev and double check the wiring instructions
        GetDriveFault: function(callback){
            wire.readBytes(command.GET_DRIVE_FAULT, limit.I2C_MAX_LEN, function(err, res) {
                if ( err ){
                    callback(err);
                } else {
                    if ( !Buffer.isBuffer(res) ){
                        callback(new Error("Failed reading drive fault state!"));
                    }
                    if ( res[1] == value.OFF ){
                        callback(null, false);
                    } else if ( res[1] == value.ON ){
                        callback(null, true);
                    }
                }
            });
        },

        /***** Encoder based functions *****/

        // Sets the system to enable or disable the encoder based move mode
        // In encoder move mode (enabled) the EncoderMoveMotor* commands are available to move fixed distances
        // In non-encoder move mode (disabled) the SetMotor* commands should be used to set drive levels
        // The encoder move mode requires that the encoder feedback is attached to an encoder signal, see the website at www.piborg.org/picoborgrev for wiring instructions
        // The encoder based move mode is disabled at power on
        // require bool
        SetEncoderMoveMode: function(state, callback){

        },

        // Read the current system state of the encoder based move mode, True for enabled (encoder moves), False for disabled (power level moves)
        GetEncoderMoveMode: function(callback){

        },

        // Moves motor 2 until it has seen a number of encoder counts, up to 32767
        // Use negative values to move in reverse
        // e.g.
        // EncoderMoveMotor2(100)   -> motor 2 moving forward for 100 counts
        // EncoderMoveMotor2(-50)   -> motor 2 moving reverse for 50 counts
        // EncoderMoveMotor2(5)     -> motor 2 moving forward for 5 counts
        // require int
        EncoderMoveMotor2: function(counts, callback){

        },

        // Moves motor 1 until it has seen a number of encoder counts, up to 32767
        // Use negative values to move in reverse
        // e.g.
        // EncoderMoveMotor1(100)   -> motor 1 moving forward for 100 counts
        // EncoderMoveMotor1(-50)   -> motor 1 moving reverse for 50 counts
        // EncoderMoveMotor1(5)     -> motor 1 moving forward for 5 counts
        // require int
        EncoderMoveMotor1: function(counts, callback){

        },

        // Moves all motors until they have each seen a number of encoder counts, up to 65535
        // Use negative values to move in reverse
        // e.g.
        // EncoderMoveMotors(100)   -> all motors moving forward for 100 counts
        // EncoderMoveMotors(-50)   -> all motors moving reverse for 50 counts
        // EncoderMoveMotors(5)     -> all motors moving forward for 5 counts
        // require int
        EncoderMoveMotors: function(counts, callback){

        },

        // Reads the current state of the encoder motion, False for all motors have finished, True for any motor is still moving
        IsEncoderMoving: function(callback){

        },

        // Sets the drive limit for encoder based moves, from 0 to 1.
        // e.g.
        // SetEncoderSpeed(0.01)  -> motors may move at up to 1% power
        // SetEncoderSpeed(0.1)   -> motors may move at up to 10% power
        // SetEncoderSpeed(0.5)   -> motors may move at up to 50% power
        // SetEncoderSpeed(1)     -> motors may move at up to 100% power
        // require int
        SetEncoderSpeed: function(power, callback){

        },

        // Gets the drive limit for encoder based moves, from 0 to 1.
        // e.g.
        // 0.01  -> motors may move at up to 1% power
        // 0.1   -> motors may move at up to 10% power
        // 0.5   -> motors may move at up to 50% power
        // 1     -> motors may move at up to 100% power
        GetEncoderSpeed: function(callback){

        },

        /***** Advanced functions *****/

        // Scans the I2C bus for PicoBorg Reverse boards and returns a count of all the boards found
        // require int, the bus on which to look; 0 or 1
        // returns array of addresses
        ScanForCount: function(bus, callback){
            var found = [];
            // TODO - need to somehow actually use the bus parameter input
            console.log("Scanning I²C bus on " + value.I2C_BUS_ID + ".");
            wire.scan(function(err, data) {
                if ( err !== null ){
                    callback(err);
                }
                for( var d in data ){
                    if ( data[d] !== 0 ){
                        var hex = data[d];
                        var dec = "0x" + hex.toString(16);
                        console.log("Evaluating device at address " + dec + ".");
                        var tw = new i2c(dec, {device: value.I2C_BUS_ID});
                        tw.readBytes(command.GET_ID, limit.I2C_MAX_LEN, function(err, res) {
                            if ( err !== null ){
                                callback(err);
                            }
                            if ( !Buffer.isBuffer(res) ){
                                callback(new Error("Scan return was not a buffer object."));
                            }
                            if ( res[1] == value.I2C_ID_PICOBORG_REV ){
                                //this is one
                                console.log("Found PicoBorg Reverse at " + res[1] + ".");
                                found.push(res[1]);
                            }
                        });
                    }
                }
                callback(null, found);
            });
        },

        // Scans the I2C bus for a PicoBorg Reverse board, index is which address to return (from 0 to count - 1)
        // Returns address 0 if no board is found for that index
        // require byte
        ScanForAddress: function(index, callback){

        },

        // Sets the PicoBorg Reverse at the current address to newAddress
        // Warning, this new I²C address will still be used after resetting the power on the device
        // If successful returns true and updates Address, otherwise returns false
        // require byte
        SetNewAddress: function(newAddress, callback){
            wire.writeBytes(command.SET_I2C_ADD, [newAddress], function(err) {
                if ( err ){
                    callback(err);
                }
                wire.setAddress(newAddress, function(err) {
                    if ( err ){
                        callback(err);
                    }
                });
            });            
        }

    };
}

exports.picoborgrev = picoborgrev;
