export const phoneFormat = (phone: string) =>
  phone !== null && phone && phone.length > 9
    ? `+7 (${phone.substring(1, 4)}) ${phone.substring(4, 7)} ${phone.substring(7, 9)} ${phone.substring(9)}`
    : phone
