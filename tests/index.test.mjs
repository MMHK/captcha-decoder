import { ChatInterface } from '../src/llm.mjs';
import fs from "fs";
import path from "path";

const loadDataURIFromLocalImage = () => {
    return "data:image/png;base64," + fs.readFileSync(path.join(__dirname, 'captcha.png')).toString('base64');
}

describe('Captcha Decoder Tests', () => {

  it('decode-captcha', async () => {
      const decoder = new ChatInterface();

      const imgDataURl = loadDataURIFromLocalImage();

      const text = await decoder.recognizeCaptcha(imgDataURl);

      expect(text).toBe("ryxmg");
  });
});
