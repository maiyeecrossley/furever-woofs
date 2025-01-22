export function calculateAge(dob) {

    const birthDate = typeof dob === "string" ? new Date(dob) : dob

    if (isNaN(birthDate)) {
        return "Invalid Date of Birth"
    }

    const today = new Date()

    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()


    if (days < 0) {
        months -= 1;
        const previousMonth = (today.getMonth() - 1 + 12) % 12
        days += new Date(today.getFullYear(), previousMonth + 1, 0).getDate()
    }

    if (months < 0) {
        years -= 1
        months += 12
    }

    return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}`
}