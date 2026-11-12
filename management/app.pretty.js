(function () {
  'use strict';

  var _0x3e9fff = {
    "infra": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"6\" rx=\"1.5\"/><rect x=\"3\" y=\"14\" width=\"18\" height=\"6\" rx=\"1.5\"/><path d=\"M7 7h.01M7 17h.01\"/>",
    id: "<circle cx=\"12\" cy=\"8\" r=\"3.2\"/><path d=\"M5.5 20a6.5 6.5 0 0 1 13 0\"/><path d=\"M12 11.5v3\"/>",
    "desk": "<path d=\"M4 5h16v10H4z\"/><path d=\"M2 19h20\"/><path d=\"M9 15v4M15 15v4\"/>",
    "backup": "<path d=\"M12 3v9\"/><path d=\"M8.5 8.5 12 12l3.5-3.5\"/><path d=\"M4 14a8 8 0 0 0 16 0\"/>",
    "eye": "<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/>",
    "shield": "<path d=\"M12 3 5 6v5c0 4.2 2.9 7.4 7 9 4.1-1.6 7-4.8 7-9V6Z\"/><path d=\"m9.2 12 1.9 1.9 3.7-3.8\"/>",
    "key": "<circle cx=\"8\" cy=\"14\" r=\"3.2\"/><path d=\"m10.5 11.5 8-8M16 6l2.5 2.5M14 8l2 2\"/>",
    "flow": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.4\"/><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.4\"/><path d=\"M9 6h4a3 3 0 0 1 3 3v6\"/>",
    "clock": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>",
    "mail": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"m3 7 9 6 9-6\"/>",
    "pin": "<path d=\"M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11Z\"/><circle cx=\"12\" cy=\"10\" r=\"2.4\"/>",
    "phone": "<path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z\"/>"
  };
  var _0x3e4444 = {
    i: "infra",
    t: "Managed Infrastructure",
    d: "We run your servers, networks and virtualisation as one estate — patched, hardened and monitored around the clock.",
    l: ["24/7 NOC coverage", "Patch & configuration baselines", "Capacity and lifecycle planning"]
  };
  var _0x2d79a9 = {
    i: 'id',
    t: "Identity & Access",
    d: "A single sign-on broker fronts every client application, with federation, MFA and self-service recovery built in.",
    l: ["SSO / SAML & OAuth federation", "Multi-factor enforcement", "Joiner / mover / leaver automation"]
  };
  var _0x15443c = {
    i: "desk",
    t: "Service Desk & Assets",
    d: "One ITIL service desk tracks every ticket, asset and licence across your fleet, with full CMDB visibility.",
    l: ["Incident & change management", "Asset & licence inventory", "SLA reporting"]
  };
  var _0x300d6d = {
    i: "backup",
    t: "Backup & Disaster Recovery",
    d: "Deduplicated, encrypted backups of every managed host, with rehearsed restores and documented recovery targets.",
    l: ["Encrypted off-site repositories", "Daily integrity verification", "Tested restore runbooks"]
  };
  var _0x145295 = {
    i: "eye",
    t: "Monitoring & Response",
    d: "Telemetry from every endpoint feeds a single alert pipeline so we catch problems before your users do.",
    l: ["Metrics & log aggregation", "Threshold & anomaly alerting", "Guided remediation"]
  };
  var _0xf71971 = {
    i: "shield",
    t: "Security Operations",
    d: "Continuous hardening, vulnerability triage and access review keep your environment audit-ready all year.",
    l: ["Vulnerability management", "Quarterly access reviews", "Audit & compliance support"]
  };
  var _0x28ede5 = [_0x3e4444, _0x2d79a9, _0x15443c, _0x300d6d, _0x145295, _0xf71971];
  var _0x50f62e = {
    i: "key",
    t: "Unified identity broker",
    d: "Every portal, from the service desk to client dashboards, authenticates through one hardened SSO gateway."
  };
  var _0xe91e6 = {
    i: "flow",
    t: "One operations platform",
    d: "Assets, tickets, monitoring and backup share a single source of truth — no spreadsheets, no blind spots."
  };
  var _0x372db2 = {
    i: "backup",
    t: "Recovery you can prove",
    d: "Restores are rehearsed on a schedule, not improvised during an incident."
  };
  var _0x3f91e9 = {
    i: "clock",
    t: "15-minute response",
    d: "Priority incidents are acknowledged by a named engineer within fifteen minutes, day or night."
  };
  var _0x4dfa66 = [_0x50f62e, _0xe91e6, _0x372db2, _0x3f91e9];
  var _0x2ff1db = {
    n: "99.98<span>%</span>",
    l: "Platform uptime, trailing 12 months"
  };
  var _0x5d9df9 = {
    n: "15<span>m</span>",
    l: "Median priority response time"
  };
  var _0x23f7e5 = {
    n: "4,200<span>+</span>",
    l: "Endpoints under management"
  };
  var _0x329586 = {
    n: "24<span>/7</span>",
    l: "Network operations coverage"
  };
  var _0x5c802e = [_0x2ff1db, _0x5d9df9, _0x23f7e5, _0x329586];
  function _0x1f88cc() {
    var _0x36f167 = document.getElementById("app");
    _0x36f167.innerHTML = "<header class=\"nav\"><div class=\"wrap nav-in\"><a class=\"brand\" href=\"#top\"><span class=\"mark\"></span><span>MANAGE<b>MENT</b></span></a><nav class=\"nav-links\" id=\"menu\"><a href=\"#services\">Services</a><a href=\"#platform\">Platform</a><a href=\"#why\">Why us</a><a href=\"#contact\">Contact</a><a class=\"btn btn-primary\" href=\"https://sso.management.htb/\">Client login</a></nav><button class=\"nav-toggle\" id=\"burger\" aria-label=\"Menu\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6h18M3 12h18M3 18h18\"/></svg></button></div></header><main id=\"top\"><section class=\"hero\"><div class=\"hero-grid\"></div><div class=\"wrap hero-in\"><p class=\"eyebrow rev\">Managed IT &amp; infrastructure</p><h1 class=\"rev\">Your infrastructure, <span class=\"hl\">fully managed</span>.</h1><p class=\"lead rev\">Management runs the identity, service desk, monitoring and backup that keep mid-market businesses online — so your team ships, and we keep the lights on.</p><div class=\"hero-cta rev\"><a class=\"btn btn-primary\" href=\"#services\">Explore services <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></a><a class=\"btn btn-ghost\" href=\"https://sso.management.htb/\">Client login</a></div><div class=\"hero-meta rev\"><div><div class=\"n\">99.98%</div><div class=\"l\">Uptime</div></div><div><div class=\"n\">15&nbsp;min</div><div class=\"l\">Response</div></div><div><div class=\"n\">ISO&nbsp;27001</div><div class=\"l\">Aligned</div></div></div></div></section><section class=\"section\" id=\"services\"><div class=\"wrap\"><div class=\"section-head rev\"><p class=\"eyebrow\">What we run</p><h2>Everything your IT needs, under one roof.</h2><p>Six managed services that share one platform and one accountable team. Pick the cover you need today and grow into the rest.</p></div><div class=\"grid grid-3\">" + _0x28ede5.map(function (_0x26bb1c) {
      return "<article class=\"card rev\"><div class=\"ico\">" + ("<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\">" + _0x3e9fff[_0x26bb1c.i] + "</svg>") + "</div><h3>" + _0x26bb1c.t + "</h3><p>" + _0x26bb1c.d + "</p><ul>" + _0x26bb1c.l.map(function (_0x54ba0c) {
        return "<li>" + _0x54ba0c + "</li>";
      }).join('') + "</ul></article>";
    }).join('') + "</div>" + "</div></section>" + "<section class=\"section\" id=\"platform\"><div class=\"wrap\">" + "<div class=\"split\">" + "<div><p class=\"eyebrow rev\">The platform</p><h2 class=\"rev\">One pane of glass for the whole estate.</h2><p class=\"muted rev\" style=\"margin:16px 0 26px\">Management isn't a folder of disconnected tools. Identity, assets, monitoring and backup feed a single operations platform, so every engineer sees the same truth and nothing falls through the cracks.</p>" + "<div class=\"rev\">" + _0x4dfa66.map(function (_0x272feb) {
      return "<div class=\"feature\"><div class=\"fi\">" + ("<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\">" + _0x3e9fff[_0x272feb.i] + "</svg>") + "</div><div><h3>" + _0x272feb.t + "</h3><p>" + _0x272feb.d + "</p></div></div>";
    }).join('') + "</div></div>" + "<div class=\"panel rev\"><div class=\"bar\"><i></i><i></i><i></i></div><div class=\"scr\">" + "<div class=\"row\"><span class=\"d\">identity.broker</span><span class=\"g\">online</span></div>" + "<div class=\"row\"><span class=\"d\">service-desk</span><span class=\"g\">online</span></div>" + "<div class=\"row\"><span class=\"d\">monitoring</span><span class=\"g\">online</span></div>" + "<div class=\"row\"><span class=\"d\">backup.repo</span><span class=\"g\">verified</span></div>" + "<div style=\"margin-top:14px\"><span class=\"k\">$</span> <span class=\"d\">estate status --summary</span></div>" + "<div class=\"d\">hosts managed&nbsp;&nbsp;&nbsp;4218 / 4218 healthy</div>" + "<div class=\"d\">open incidents&nbsp;&nbsp;2 low &nbsp;0 high</div>" + "<div class=\"d\">last backup&nbsp;&nbsp;&nbsp;&nbsp;02:14 &middot; integrity ok</div>" + "</div></div>" + "</div>" + "</div></section>" + "<section class=\"section\" id=\"why\"><div class=\"wrap\">" + "<div class=\"section-head rev\"><p class=\"eyebrow\">Why Management</p><h2>The numbers our clients hold us to.</h2></div>" + "<div class=\"strip rev\">" + _0x5c802e.map(function (_0x310225) {
      return "<div><div class=\"n\">" + _0x310225.n + "</div><div class=\"l\">" + _0x310225.l + "</div></div>";
    }).join('') + "</div>" + "</div></section>" + "<section class=\"section\" id=\"contact\"><div class=\"wrap\">" + "<div class=\"contact\">" + "<div><p class=\"eyebrow rev\">Talk to us</p><h2 class=\"rev\">Scope a managed engagement.</h2><p class=\"muted rev\" style=\"margin-top:16px\">Tell us what you run today. An engineer — not a sales bot — will come back with a clear scope and a fixed monthly figure.</p>" + "<div class=\"cinfo rev\" style=\"margin-top:28px\">" + "<div class=\"row\"><div class=\"ci\">" + "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"m3 7 9 6 9-6\"/></svg>" + "</div><div><div class=\"t\">Email</div><div class=\"v\">hello@management.htb</div></div></div>" + "<div class=\"row\"><div class=\"ci\">" + "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z\"/></svg>" + "</div><div><div class=\"t\">Service desk</div><div class=\"v\">+44 20 7946 0142</div></div></div>" + "<div class=\"row\"><div class=\"ci\">" + "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11Z\"/><circle cx=\"12\" cy=\"10\" r=\"2.4\"/></svg>" + "</div><div><div class=\"t\">Operations centre</div><div class=\"v\">Holborn, London</div></div></div>" + "</div></div>" + "<form class=\"form rev\" id=\"cform\" novalidate>" + "<div class=\"field\"><label for=\"fn\">Full name</label><input id=\"fn\" name=\"fn\" type=\"text\" autocomplete=\"name\" required></div>" + "<div class=\"field\"><label for=\"fc\">Company</label><input id=\"fc\" name=\"fc\" type=\"text\" autocomplete=\"organization\"></div>" + "<div class=\"field\"><label for=\"fe\">Work email</label><input id=\"fe\" name=\"fe\" type=\"email\" autocomplete=\"email\" required></div>" + "<div class=\"field\"><label for=\"fs\">What do you need managed?</label><select id=\"fs\" name=\"fs\"><option>Managed infrastructure</option><option>Identity &amp; access</option><option>Service desk &amp; assets</option><option>Backup &amp; DR</option><option>Full managed estate</option></select></div>" + "<div class=\"field\"><label for=\"fm\">Message</label><textarea id=\"fm\" name=\"fm\" placeholder=\"Roughly how many users and sites?\"></textarea></div>" + "<button class=\"btn btn-primary\" type=\"submit\" style=\"width:100%;justify-content:center\">Request a scope</button>" + "<div class=\"toast\" id=\"toast\">Thanks — your request is queued. An engineer will reply to your work email shortly.</div>" + "</form>" + "</div>" + "</div></section>" + "</main>" + "<footer><div class=\"wrap\"><div class=\"foot\">" + "<div><a class=\"brand\" href=\"#top\" style=\"margin-bottom:14px\"><span class=\"mark\"></span><span>MANAGE<b>MENT</b></span></a><p class=\"muted\" style=\"max-width:280px;font-size:.9rem\">Managed IT, identity and infrastructure for businesses that would rather build than babysit servers.</p></div>" + "<div class=\"cols\">" + "<div><h4>Services</h4><a href=\"#services\">Managed infrastructure</a><a href=\"#services\">Identity &amp; access</a><a href=\"#services\">Service desk</a><a href=\"#services\">Backup &amp; DR</a></div>" + "<div><h4>Company</h4><a href=\"#platform\">Platform</a><a href=\"#why\">Why us</a><a href=\"#contact\">Contact</a><a href=\"" + "https://sso.management.htb/" + "\">Client login</a></div>" + "</div>" + "</div><div class=\"copy\">&copy; 2026 Management Managed Services Ltd. All rights reserved.</div></div></footer>";
    _0x27f0b7();
    _0xfcc67b();
  }
  function _0x27f0b7() {
    var _0x17f03f = document.getElementById("burger");
    var _0x507f8d = document.getElementById("menu");
    if (_0x17f03f) {
      _0x17f03f.addEventListener("click", function () {
        _0x507f8d.classList.toggle("open");
      });
    }
    Array.prototype.forEach.call(document.querySelectorAll("#menu a"), function (_0xa090bd) {
      _0xa090bd.addEventListener("click", function () {
        _0x507f8d.classList.remove("open");
      });
    });
    var _0x10e2af = document.getElementById("cform");
    if (_0x10e2af) {
      _0x10e2af.addEventListener("submit", function (_0x553d63) {
        _0x553d63.preventDefault();
        var _0x26a071 = document.getElementById('fn');
        var _0xf02c58 = document.getElementById('fe');
        if (!_0x26a071.value.trim() || !_0xf02c58.value.trim()) {
          if (!_0x26a071.value.trim()) {
            _0x26a071.focus();
          }
          if (!(_0xf02c58.value.trim() && !_0x26a071.value.trim())) {
            _0xf02c58.focus();
          }
          return;
        }
        document.getElementById("toast").classList.add('on');
        _0x10e2af.reset();
      });
    }
  }
  function _0xfcc67b() {
    var _0x383650 = document.querySelectorAll(".rev");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(_0x383650, function (_0x503bf1) {
        _0x503bf1.classList.add('in');
      });
      return;
    }
    var _0x37460f = {
      threshold: 0.12
    };
    var _0x1a6deb = new IntersectionObserver(function (_0x4e9001) {
      _0x4e9001.forEach(function (_0x440d99) {
        if (_0x440d99.isIntersecting) {
          _0x440d99.target.classList.add('in');
          _0x1a6deb.unobserve(_0x440d99.target);
        }
      });
    }, _0x37460f);
    Array.prototype.forEach.call(_0x383650, function (_0x1a608f) {
      _0x1a6deb.observe(_0x1a608f);
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", _0x1f88cc);
  } else {
    _0x1f88cc();
  }
})();