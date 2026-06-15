export default function convertDateFormat(input: string): string {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const [day, month, year] = input.split("-");
    const monthName = months[parseInt(month) - 1];

    return `${day} ${monthName} ${year}`;
  }