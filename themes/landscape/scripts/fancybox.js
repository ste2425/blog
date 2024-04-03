var rUrl =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/;

/**
 * Fancybox tag
 *
 * Syntax:
 *   {% fancybox /path/to/image [/path/to/thumbnail] [title] %}
 */

hexo.extend.tag.register("fancybox", function ([original, _thumbnail, _title]) {
  const title = !_title ? _thumbnail : _title,
    thumbnail = !_title ? undefined : _thumbnail;

  return `
  <a class="fancybox" 
    href="${original}"
    title="${title}"
  >
    <img
      src="${thumbnail || original}"
      style="max-width: 300px"
      alt="${title}" />
  </a>

  <span class="caption ${title ? "" : "hide"}">
    ${title}
  </span>
`;
});

hexo.extend.tag.register(
  "fancyboxmedia",
  function ([original, _thumbnail, _title]) {
    const title = !_title ? _thumbnail : _title,
      thumbnail = !_title ? undefined : _thumbnail;

    return `
  <a class="fancybox" 
    href="${original}"
    title="${title}"
  >
  </a>

`;
  }
);
