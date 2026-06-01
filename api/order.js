export default async function handler(req, res) {
  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : (req.body || {});

    const { link, quantity } = body;

    if (!link || !quantity) {
      return res.status(400).json({
        success: false,
        error: "link dan quantity wajib diisi"
      });
    }

    const response = await fetch("https://smm.id/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        key: process.env.SMM_API_KEY,
        action: "add",
        service: process.env.SMM_SERVICE_ID,
        link,
        quantity: String(quantity)
      })
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
