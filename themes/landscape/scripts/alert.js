const levels = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  danger: "alert-danger",
};

function validateLevel(level) {
  if (!(level in levels))
    throw new ReferenceError(
      `Alert level '${level}' invalid. Valid levels are: ${Object.keys(
        levels
      ).join(", ")}`
    );
}

hexo.extend.tag.register(
  "alert",
  async function ([level = "info"], contentRaw) {
    validateLevel(level);

    const content = await hexo.render.render({
      text: contentRaw,
      engine: "md",
    });

    return `<div class="alert ${levels[level]}">
      ${content}
      </div>`;
  },
  { ends: true, async: true }
);
