set - ex

USERNAME=vivaconagua
IMAGE=emoto-client

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

echo "EMOTO Client v$PACKAGE_VERSION"

docker build -t $USERNAME/$IMAGE:latest .

docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$PACKAGE_VERSION
