import com.bbva.arch.api.pe.GlobalServiceSteps;
import com.bbva.arch.qe.backend.cucumber.module.BackendTesting;
import com.bbva.arch.qe.backend.runner.cucumber.ManagedCucumber;
import com.bbva.arch.qe.backend.runner.cucumber.Tags;
import com.bbva.arch.qe.backend.runner.cucumber.modules.Module;
import com.bbva.arch.qe.backend.runner.cucumber.properties.SystemProperty;
import org.junit.runner.RunWith;

@RunWith(ManagedCucumber.class)
@Module(BackendTesting.class)
@Module(GlobalServiceSteps.class)


@SystemProperty(name="backends", value="was=https://desa30.fnetcore.arg.igrupobbva")
@SystemProperty(name="defaultBackend", value="was")

@Tags("@Tier1 or @Tier2 or @Tier3")
public class IntegrationTest {
}