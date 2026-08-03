

export const formatRelativeTime = (timestamp)=>{
    
    if(!timestamp) return "";

    const date = timestamp.toDate();
    const now = new Date();
    const diff = now - date // it will have in milliseconds
    //now converting milliseconds to seconds

    const seconds = Math.floor(diff / 1000)

    const minutes = Math.floor(seconds / 60);

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);

    const weeks = Math.floor(days / 7);

    const months = Math.floor(days / 30);

    const years = Math.floor(days / 365);


    if (seconds < 60)
    return "Just now";
    if (minutes < 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days === 1)
    return "Yesterday";
    if (days < 7)
    return `${days} days ago`;
    if (weeks < 5)
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (months < 12)
    return `${months} month${months > 1 ? "s" : ""} ago`;
    return `${years} year${years > 1 ? "s" : ""} ago`;
}