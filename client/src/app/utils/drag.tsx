import * as d3 from "d3";
// @ts-ignore
import versor from "versor";

export function drag(projection: d3.GeoProjection) {
  let v0: number,
    q0: number,
    r0: [number, number, number],
    a0: number,
    l: number;

  function pointer(event: any, that: any) {
    const t = d3.pointers(event, that);

    if (t.length !== l) {
      l = t.length;
      if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      // @ts-ignore
      dragstarted.apply(that, [event, that]);
    }

    // For multitouch, average positions and compute rotation.
    if (l > 1) {
      const x = d3.mean(t, (p) => p[0]);
      const y = d3.mean(t, (p) => p[1]);
      const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      return [x, y, a];
    }

    return t[0];
  }

  function dragstarted(event: any) {
    // @ts-ignore
    v0 = versor.cartesian(projection.invert(pointer(event, this)));
    q0 = versor((r0 = projection.rotate()));
  }

  function dragged(event: any) {
    //@ts-ignore
    const p = pointer(event, this);
    //@ts-ignore
    const v1 = versor.cartesian(projection.rotate(r0).invert(p));
    const delta = versor.delta(v0, v1);
    let q1 = versor.multiply(q0, delta);

    // For multitouch, compose with a rotation around the axis.
    if (p[2]) {
      const d = (p[2] - a0) / 2;
      const s = -Math.sin(d);
      const c = Math.sign(Math.cos(d));
      q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
    }

    projection.rotate(versor.rotation(q1));

    // In vicinity of the antipode (unstable) of q0, restart.
    // @ts-ignore
    if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
  }

  return d3.drag().on("start", dragstarted).on("drag", dragged);
}
