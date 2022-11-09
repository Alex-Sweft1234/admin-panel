export const phoneFormat = (phone: string) =>
  phone !== null && phone && phone.length > 9
    ? `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)} ${phone.substring(6, 8)} ${phone.substring(8, 10)}`
    : phone
