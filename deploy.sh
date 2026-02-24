#!/bin/bash

# Deploy help.venturehome.com to GCP VM
# Run this on the server (34.139.8.36)

set -e

echo "🚀 Deploying help.venturehome.com..."

# 1. Create directory
sudo mkdir -p /opt/help-venturehome

# 2. Clone repo
cd /opt
if [ ! -d "help-venturehome" ]; then
  sudo git clone https://github.com/VentureHomeSolarLLC/help-venturehome.git
fi

# 3. Build
cd help-venturehome
sudo git pull origin main
sudo npm ci
sudo npm run build

# 4. Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/help-venturehome
sudo ln -sf /etc/nginx/sites-available/help-venturehome /etc/nginx/sites-enabled/
sudo nginx -t

# 5. Reload nginx
sudo systemctl reload nginx

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Set up SSL: sudo certbot --nginx -d help.venturehome.com"
echo "2. Verify site loads at https://help.venturehome.com"