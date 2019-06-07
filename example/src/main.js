
import Currnt from 'currnt';

const dataToTransform = [...Array(30).keys()];

new Currnt(async (d) => {
  console.log(`Started\t\t🔥 ${d}`);
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * 2000) + 2000));
  console.log(`Finished\t🛑 ${d}`);
  return d * 2;
}, dataToTransform).batch(5).run().then((result) => {
  console.log('Result', result);
});
