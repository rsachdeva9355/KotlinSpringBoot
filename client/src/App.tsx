import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/profile-page";
import PetProfilesPage from "@/pages/pet-profiles-page";
import ServicesPage from "@/pages/services-page";
import InfoHubPage from "@/pages/info-hub-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route path="/">
            <ProtectedRoute path="/" component={HomePage} />
          </Route>
          <Route path="/profile">
            <ProtectedRoute path="/profile" component={ProfilePage} />
          </Route>
          <Route path="/pets">
            <ProtectedRoute path="/pets" component={PetProfilesPage} />
          </Route>
          <Route path="/services">
            <ProtectedRoute path="/services" component={ServicesPage} />
          </Route>
          <Route path="/info">
            <ProtectedRoute path="/info" component={InfoHubPage} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
