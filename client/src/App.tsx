import { Switch, Route, Redirect } from "wouter";
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
import { CityProvider } from "./hooks/use-city";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route path="/info" component={InfoHubPage} />
          <Route path="/" component={InfoHubPage} />
          <Route path="/profile">
            <ProtectedRoute path="/profile" component={ProfilePage} />
          </Route>
          <Route path="/pets">
            <ProtectedRoute path="/pets" component={PetProfilesPage} />
          </Route>
          <Route path="/services">
            <ProtectedRoute path="/services" component={ServicesPage} />
          </Route>
          <Route>
            <NotFound />
          </Route>
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
        <CityProvider>
          <Router />
          <Toaster />
        </CityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
