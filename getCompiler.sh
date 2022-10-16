#!/bin/sh

COMPILER_VERSION=""
GITHUB_OWNER="sCrypt-Inc"
GITHUB_REPO="compiler_dist"
INSTALL_DIR="./compiler/scryptc/linux/"
BIN_NAME="scryptc"

# If compiler version isn't explicitly specified, try to look up the latest stable rease on the web.
if [ -z $COMPILER_VERSION ]; then
    res=$(curl -s https://api.github.com/repos/sCrypt-Inc/compiler_dist/releases/latest | grep "tag_name" )
    COMPILER_VERSION=$(echo $res | cut -d'=' -f2 | sed -e "s/tag_name//g" -e "s/[\": ,v]//g")
fi
GITHUB_TAG="v$COMPILER_VERSION"

# Detect platform.
UNAME=$(uname)
if [ "$UNAME" = "Linux" -o "$UNAME" = "FreeBSD" ]; then
    URL_POSTFIX="Linux"
elif [ "$UNAME" = "Darwin" ]; then
    URL_POSTFIX="macOS"
else
    echo "OS type \"$UNAME\" not supported." && exit 1
fi

# URL to download from..
DL_URL="https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/download/${GITHUB_TAG}/scryptc-${COMPILER_VERSION}-${URL_POSTFIX}"
if [ $(curl -o /dev/null -s -w "%{http_code}\n" $DL_URL) = "404" ]; then
    echo  "Version not found: $GITHUB_TAG"
    exit 1
fi

# Create install dir if it doesn't exist yet.
mkdir -p $INSTALL_DIR

# Remove old install if it exists.
if [ -f "$INSTALL_DIR/$BIN_NAME" ]; then
    rm $INSTALL_DIR/$BIN_NAME
fi

# Download and install the compiler.
curl -L -J $DL_URL -o $INSTALL_DIR/$BIN_NAME || exit 7
chmod +x $INSTALL_DIR/$BIN_NAME || exit 8

echo
echo "The sCrypt compiler was successfully installed."
