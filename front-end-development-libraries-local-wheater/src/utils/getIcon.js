export default function getIcon(climate) {
    switch(climate) {
        case "clouds":
            return "https://cdn-icons-png.flaticon.com/128/1163/1163624.png";
        case "rain":
            return "https://cdn-icons-png.flaticon.com/128/1163/1163626.png";
        case "drizzle":
            return "https://cdn-icons-png.flaticon.com/128/1163/1163628.png";
        case "snow":
            return "https://cdn-icons-png.flaticon.com/128/1163/1163635.png";
        case "thunderstorm":
            return "https://cdn-icons-png.flaticon.com/128/1163/1163636.png";
        case "clear":
            return "https://cdn-icons-png.flaticon.com/128/1163/1163662.png";
        default:
            return "https://cdn-icons-png.flaticon.com/128/1163/1163638.png";
    }
}