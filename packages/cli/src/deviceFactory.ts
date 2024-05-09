import { ColorMode, DisplayDevice, Orientation } from '@epaperjs/core';

export async function getDevice(
    deviceType: string,
    orientation?: Orientation,
    colorMode?: ColorMode
): Promise<DisplayDevice> {
    const factory = deviceMap.get(deviceType);
    if (factory) {
        return await factory(orientation, colorMode);
    }
    throw new Error(`Device type ${deviceType} not recognized`);
}

const deviceMap = new Map<string, (orientation?: Orientation, colorMode?: ColorMode) => Promise<DisplayDevice>>([
    ['rpi-7in5-v2', getRpi7in5V2]
]);

async function getRpi7in5V2(orientation?: Orientation, colorMode?: ColorMode): Promise<DisplayDevice> {
    try {
        const { Rpi7In5V2 } = await import('@epaperjs/rpi-7in5-v2');
        return new Rpi7In5V2(orientation, colorMode);
    } catch (e) {
        throw new Error('Failed to import @epaperjs/rpi-7in5-v2, make sure it is installed');
    }
}
