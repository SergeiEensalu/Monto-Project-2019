node {
  stage('SCM Checkout') {
    git 'https://github.com/SergeiEensalu/Monto-Project-2019/'
  }
  stage('Compile-Package') {
    // Get Maven home path
    def mvnHome = tool name: 'maven-3', type: 'maven'
    sh "${mvnHome}/bin/mvn package"
  }
}
