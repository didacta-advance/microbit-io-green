
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum KojiMotor {
    //% block="motor 1"
    motor01 = 0,
    //% block="motor 2"
    motor02 = 1,
    //% block="motor 3"
    motor03 = 2,
    //% block="motor 4"
    motor04 = 3
}

enum KojeStanje {
    //% block="stop"
    stop,
    //% block="smjer A"
    smjer_a,
    //% block="smjer B"
    smjer_b
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace Microbit_IO {

    //% weight=100
    //% blockId=motor_conv
    //% block="%kojeg"
    export function motor_conv(kojeg: KojiMotor): number {
        return <number>kojeg;
    }

    //% weight=99
    //% blockId=stanje_conv
    //% block="%koje"
    export function stanje_conv(koje: KojeStanje): string {
        switch (koje) {
            case KojeStanje.stop: return "stop";
            case KojeStanje.smjer_a: return "smjer_a";
            case KojeStanje.smjer_b: return "smjer_b";
            default: return null;
        }
    }

    let motorPinMapa = [
        [DigitalPin.P9, DigitalPin.P10],
        [DigitalPin.P11, DigitalPin.P12],
        [DigitalPin.P13, DigitalPin.P14],
        [DigitalPin.P15, DigitalPin.P16]
    ];

    /**
     * Promjeni stanje motora
     */
    //% weight=98
    //% blockId=promjeni_stanje
    //% block="promjeni stanje| motora  %broj_motora=motor_conv|  u %stanje=stanje_conv"
    //% blockExternalInputs=true
    export function promjeni_stanje(broj_motora: number, stanje: string): void {
        let p = motorPinMapa[broj_motora];

        switch (stanje) {
            case "smjer_a":
                pins.digitalWritePin(p[0], 1);
                pins.digitalWritePin(p[1], 0);
                break;
            case "smjer_b":
                pins.digitalWritePin(p[0], 0);
                pins.digitalWritePin(p[1], 1);
                break;
            case "stop":
                pins.digitalWritePin(p[0], 0);
                pins.digitalWritePin(p[1], 0);
                break;
            default:
                pins.digitalWritePin(p[0], 0);
                pins.digitalWritePin(p[1], 0);
                break;
        }
    }

    /**
     * Stopiraj sve motor
     */
    //% weight=97
    //% blockId=motor_stop_svi
    //% block="zaustavi sve motore"
    export function stop_svi(): void {  
        for (let i = 0; i < motorPinMapa.length; i++) {
            const p = motorPinMapa[i];
            pins.digitalWritePin(p[0], 0);
            pins.digitalWritePin(p[1], 0);
        }
    }

    /**
     * Stopiraj motor
     */
    //% weight=96
    //% blockId=motor_stop
    //% block="stopiraj motor %broj_motora=motor_conv"
    export function stop(broj_motora: number): void {
        promjeni_stanje(broj_motora, "stop");
    }

    /**
     * Vrti motor u smjeru A
     */
    //% weight=95
    //% blockId=motor_vrtiA
    //% block="vrti motor %broj_motora=motor_conv| u smjeru A"
    export function smjerA(broj_motora: number): void {
        promjeni_stanje(broj_motora, "smjer_a");
    }

    /**
     * Vrti motor u smjeru B
     */
    //% weight=94
    //% blockId=motor_vrtiB
    //% block="vrti motor %broj_motora=motor_conv| u smjeru B"
    export function smjerB(broj_motora: number): void {
        promjeni_stanje(broj_motora, "smjer_b");
    }

}