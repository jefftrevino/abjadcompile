"use babel";

// based on Ben Russert's Example Hydrogen Plugin code

import abjadCompilePlugin from './abjadcompile'

const abjadCallback = (next, code, onResults) => {

  // patch code, replacing show calls with persist.as_ly calls
  lines = code.split("\n")
  var patched_code = []
  lines.forEach(function(line, index, array) {
    if (line.includes("abjad.show(")) {
      var substring_index = line.indexOf("abjad.show(")
      var patched_line = line.slice(0, substring_index)
      patched_line = patched_line + "print(abjad.persist(" + line.slice(substring_index + 11) + ".as_ly()[0])"
      patched_code.push(patched_line)
    } else {
      patched_code.push(line)
    }
  })
  code = patched_code.join("\n")

  next.execute(code, (message, channel) => {
    if (message.header && message.header.msg_type === "stream" && message.content.name === "stdout") {
      stdout_strings = message.content.text.split("\n")
      stdout_strings.forEach(function(stdout_string, index, array) {
        if (stdout_string.slice(-3) === ".ly") {
          ly_path = stdout_string
          abjadCompilePlugin.lilycompile.compile(ly_path)
        }
      })
    }

    onResults(message, channel);
  });
};

export const abjadKernelMiddleware = {
  execute: abjadCallback
};
