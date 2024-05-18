export function formatTime(totalSeconds: number) {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const remainingSecondsAfterDays = totalSeconds % (3600 * 24);

    const hours = Math.floor(remainingSecondsAfterDays / 3600);
    const remainingSecondsAfterHours = remainingSecondsAfterDays % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const seconds = Math.round(remainingSecondsAfterHours % 60);

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return {
        days,
        hours,
        minutes,
        seconds,
        paddedHours,
        paddedMinutes,
        paddedSeconds,
    };
}
