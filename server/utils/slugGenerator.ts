import slugify from 'slugify'

/**
 * Converts the string by optionally capitalizing the first letter.
 *
 * @param {string} input - The string to convert.
 * @param {boolean} [capitalize=false] - Specifies whether to capitalize the first letter.
 */
export default function (input: string, capitalize: boolean = false): string {
  const slugged = slugify(input, {
    trim: true,
    lower: true,
    remove: /[*+~.()'"?!:@#№;,\\/$%^={}[\]%]/g,
  })
  return capitalize ? slugged.charAt(0).toUpperCase() + slugged.slice(1) : slugged
}
